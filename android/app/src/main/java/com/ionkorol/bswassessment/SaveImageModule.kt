package com.ionkorol.bswassessment

import java.util.*
import java.io.IOException
import android.content.Context
import android.content.ContentValues
import android.provider.MediaStore
import android.util.Base64

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SaveImageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val context: Context = reactContext

    override fun getName(): String {
        return "SaveImageModule"
    }

    @ReactMethod
    fun saveImageToAlbum(imageBase64: String, promise: Promise) {
        val contentResolver = context.contentResolver
        val contentValues = ContentValues().apply {
            put(MediaStore.Images.Media.DISPLAY_NAME, "${UUID.randomUUID()}.png")
            put(MediaStore.Images.Media.MIME_TYPE, "image/png")
        }

        val imageBytes: ByteArray = Base64.decode(imageBase64, Base64.DEFAULT)
        try {
            contentResolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)?.also { uri ->
                contentResolver.openOutputStream(uri)?.use { outputStream ->
                    outputStream.write(imageBytes)
                    promise.resolve(uri.toString())
                }
            } ?: promise.reject("ERROR", "Failed to create image file")
        } catch (e: IOException) {
            promise.reject("ERROR", e.message)
        }
    }
}

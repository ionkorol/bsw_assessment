package com.yourpackage.saveimagemodule

import android.content.ContentValues
import android.content.Context
import android.provider.MediaStore
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.util.*

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

package com.muxic;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.lang.Exception;
import com.facebook.react.bridge.Promise;
import android.util.Log;
import android.database.Cursor;
import android.content.Context;
import android.provider.MediaStore;
import android.net.Uri;
import java.util.ArrayList;
import com.google.gson.Gson;
import android.content.ContentUris;


public class AudioModule extends ReactContextBaseJavaModule {

    Context context;

    AudioModule(ReactApplicationContext context) {
        super(context);
        this.context = context.getApplicationContext();
    }

    @Override
    public String getName() {
        return "AudioModule";
    }

    public static ArrayList<MusicFiles> fetchAudioFromDevice(Context context){
        ArrayList<MusicFiles>tempAudioList = new ArrayList<>();
        Uri uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        String[] projection = {
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.DATA, // For Path
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media._ID

        };
        Cursor cursor = context.getContentResolver().query(uri,projection,null,null,null);
        if(cursor != null){
            while(cursor.moveToNext()){
                String album = cursor.getString(0);
                String title = cursor.getString(1);
                String duration = cursor.getString(2);
                String path = cursor.getString(3);
                String artist = cursor.getString(4);
                String id = cursor.getString(5);
                Uri mySongUri= ContentUris.withAppendedId(android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, Long.parseLong(id));
                String url = mySongUri.toString();

                MusicFiles musicFiles = new MusicFiles(path, title ,artist, album, duration,id, url);
                //take log.e for check
                // Log.e("Path :" + path,"uri :" + url);
                tempAudioList.add(musicFiles);
            }
            cursor.close();
        }
        return tempAudioList;
    }


    @ReactMethod
    public void getAllAudioFiles(Promise promise) {
        try {
//            fetchAudioFromDevice(context);
            String jsonText =  new Gson().toJson(fetchAudioFromDevice(context));
            promise.resolve(jsonText);
        } catch(Exception e) {
            promise.reject("Create Event Error", e);
        }
    }
}


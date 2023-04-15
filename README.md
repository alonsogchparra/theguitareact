# The GuitaReact

<p align="center"><img src='./src/assets/guitareact_github.png' width='300' /></p>

GuitaReact is a web app where you can practice your songs using a Beat Per Minute (BPM). But also you can enjoy watching the videos of the songs that you added on the web app, and expect the unexpected because once you press the button play or next it will show up the song randomly.

If you are a musician you are going enjoy using this tool when you are going to practice. Or if you want to only enjoy the songs that you added you can do it as well.

If you are a programmer and you want to check it out how I built this or if you want to run this app on locally follow this steps:

- Clone this repository
- To make the project works properly you have to install the dependencies for this project and you can use this command

```
yarn install
```

- For this project you need to create a Youtube API if you want to display the videos, for more info check **[here](https://developers.google.com/youtube)**. Once you get the api you will paste the key on youtube.js file

- If you want to the functionalities about music works well, you need to create a project on Firebase and add the info that firebase gives you to connect the service with this project. This is important because Firebase will handle, sign in/sign up, log out, add, edit and delete music.

- You have to configure Firebase with Authentication sign-in method. Make enabled the **email/password** option.

- You also need to create the database on Firebase using the Firestore opiton. The rules that I used for this part of the project you can check it here

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{song} {
      allow read, write: if request.auth.uid != null
    }
    match /users/{userId} {
      allow create;
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid == userId
    }
  }
}
```

This code will give the read and write permission to the user to access The GuitaReact to add, edit and delete the songs.

If you want to check the features of this project. **[Check the video here](https://youtu.be/GY4IcCHOMTs)**

## You can check the project online **[HERE!](https://theguitareact.web.app/)**

I hope you enjoy this project as much as I do, eventually I will clean the project (fixing bugs or making the code more organized). Any new feature you considerate for this project or any bug found let me know. I’ll be open to listen.

Enjoy!

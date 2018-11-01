## Setup

Install dependencies

```
$ brew install carthage
$ npm i
```
Link Strip libs

```
$ react-native link react-native-payments
```

Run react-native cli

```
$ npm start
```


Run iOS

```
$ react-native run-ios
```

## Deploy Config

### iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

Start by creating a new scheme:

- In the Xcode menu, go to Product > Scheme > Edit Scheme
- Click Duplicate Scheme on the bottom
- Give it a proper name on the top left. For instance: "Myapp (staging)"

Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

- Expand the "Build" settings on left
- Click "Pre-actions", and under the plus sign select "New Run Script Action"
- Where it says "Type a script or drag a script file", type:
```
echo ".env.staging" > /tmp/envfile   # replace .env.staging for your file
```

# Deploying iMove

## Requirements
- github access
- xcode
- appstoreconnect login

## Creating the build

1) open the app in xcode
2) Increment the version number.
3) Udate the Build number to today's date and the build increment in the format YYYY.MM.DD.BB where BB is the build number starting at 00. Production builds are even numbers, staging odd.
4) Switch your Build scheme to the appropriate environment.
5) Switch device to a build only device.
6) Run and Test the app functionality.
7) Create an archive (product->archive)
8) Upload to app store

## Submit for review

1) Visit the iMOVE app on appstoreconnect.apple.com
2) click on [(+) Version or Platform] 
3) Select iOS
4) Increment the version #
5) Add build # to "what's new in this version
6) Select your newly uploaded build (may take 30 min or so to process)
7) Review all app information, save, and submit for review

## Expedite rollout

If the app rollout is taking a while to hit itunes, update the price to be the same as it is and save again. 




import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Profile.module.css";
import { userInfo } from "os";
import * as React from "react";
import useState from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Card, Button, Grid, Text } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import "react-activity-feed/dist/index.css";
import { connect } from "getstream";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  LikeButton,
  Activity,
  CommentList,
  CommentField,
  StatusUpdateForm,
  FollowButton,
} from "react-activity-feed";
import stream from "getstream";
import { useEffect } from "react";



const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;

const Profile: NextPage = (props) => {
  // const [followerListState, setFollowerListState] = useState([])
  // const [followingListState, setFollowingListState] = useState([])
  const session = useSession();
  // console.log('session',session.data?.user)
  // console.log("session", session.data?.user?.userToken);

  const streamString = session.data?.user?.userToken;
  console.log('streamString', streamString)
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const appId = process.env.NEXT_PUBLIC_STREAM_APP_ID as string;



  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home for</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {" "}
            Profile of {session.data?.user?.name}{" "}
          </h1>
          <Link href="/home">
            <Button>Home</Button>
          </Link>
          <StreamApp apiKey={apiKey} appId={appId} token={streamString}>
            <StatusUpdateForm />

            {/* <NotificationDropdown notify /> */}
            <FlatFeed
              notify
              feedGroup="user"
              Activity={(props) => (
                <Activity
                  {...props}
                  Footer={() => (
                    <div style={{ padding: "8px 16px" }}>
                      <LikeButton {...props} />
                      <CommentField
                        activity={props.activity}
                        onAddReaction={props.onAddReaction}
                      />
                      <CommentList activityId={props.activity.id} />
                    </div>
                  )}
                />
              )}
            />
          </StreamApp>
          <Card className={styles.header}>
            <Button onClick={signOut}>Sign Out</Button>
          </Card>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // create a follow button


  // let stream = require('getstream');

  // const client = stream.connect(apiKey, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2F5YSJ9.yBStiSdcIHoZLy8DC8D5PnIPeRUofbUPbRe2YseM9BY', appId);


  // const userStreamToken = client.feed('user', 'devil', userToken);


  ''


  // For the feed group 'user' and user id 'eric' get the feed
  // The user token is generated server-side for this user
  // const alexFeed = client.feed('user', 'alex', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWxleCJ9.Hwo1ZLYMkZjzEaRKy_KEEkJ5JUOOlgxSxuObxBF32uk');

  // Add the activity to the feed
  // alexFeed.addActivity({
  //   actor: 'SU:alex',
  //   verb: 'tweet',
  //   object: 'hello this is from ServerSideProps'
  // });


  //worked!
  // const lottieFlatFeed = client.feed('user', 'lottie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibG90dGllIn0.1GfqRl6bJFhK-oQdsbHM-GVBvDLhROxp0Gi1N1qLC40');
  // lottieFlatFeed.follow('user', 'alex');


  return {
    props: {},
  };
}

export default Profile;
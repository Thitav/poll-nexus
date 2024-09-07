import { getPollOptions, votePollOption } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import PollForm from "./poll-form";
import { useState } from "react";
import { set } from "react-hook-form";

export default async function PollPage({
  params: { poll },
}: {
  params: { poll: string };
}) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  const pollOptions = await getPollOptions(db, poll);

  async function voteAction(optionId: string) {
    "use server";
    const { firebaseServerApp } = await getAuthenticatedAppForUser();
    const db = getFirestore(firebaseServerApp);

    await votePollOption(db, poll, optionId);
  }

  return (
    <div>
      <PollForm
        params={{
          pollOptions: pollOptions.map((option) => ({
            id: option.id,
            text: option.name,
          })),
          voteAction,
        }}
      />
    </div>
  );
}

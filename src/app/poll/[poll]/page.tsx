import { pollGetOptions, pollVoteOption } from "@/lib/firebase/firestore";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";
import PollForm from "./poll-form";

export default async function PollPage({
  params: { poll },
}: {
  params: { poll: string };
}) {
  const { firebaseServerApp, currentUser } = await getAuthenticatedAppForUser();
  const db = getFirestore(firebaseServerApp);

  const pollOptions = await pollGetOptions(db, poll);

  async function voteAction(optionId: string) {
    "use server";
    const { firebaseServerApp, currentUser } =
      await getAuthenticatedAppForUser();
    const db = getFirestore(firebaseServerApp);

    await pollVoteOption(db, poll, optionId, currentUser!);
  }

  return (
    <div>
      <PollForm
        params={{
          pollOptions,
          voteAction,
        }}
      />
    </div>
  );
}

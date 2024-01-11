import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const data = await db.comment.findMany({
    where: { movieId: params.id },
    orderBy: { createdAt: "desc" },
  });

  return json({ data });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  });

  return json(data);
};

const Comments = () => {
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-5">Your Opinion</h1>

      <div>
        <Form method="post">
          <textarea
            name="comment"
            className="w-full border-teal-500 rounded-lg border p-3"
          />
          <input type="hidden" name="id" value={id} />
          {navigation.state === "submitting" ? (
            <button
              type="button"
              disabled
              className="bg-gray-500 text-white rounded-lg px-3 py-2 mt-3"
            >
              Submitting...
            </button>
          ) : (
            <button
              className="bg-teal-500 text-white rounded-lg px-3 py-2 mt-3"
              type="submit"
            >
              Submit comment
            </button>
          )}
        </Form>

        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;

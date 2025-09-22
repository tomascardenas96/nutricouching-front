import LoaderSpinner from "../../../../common/components/LoaderSpinner";
import "./PostsListSkeleton.css";

function PostsListSkeleton() {
  return (
    <div className="posts-list-skeleton">
      {new Array(3).fill(null).map((post) => (
        <div>
          <LoaderSpinner />
        </div>
      ))}
    </div>
  );
}

export default PostsListSkeleton;

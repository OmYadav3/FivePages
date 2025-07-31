export default function CommentItem({ comment, user, onEdit, onDelete }) {
  return (
    <div className="border p-3 rounded shadow-sm">
      <div className="text-sm text-gray-700 font-semibold">
        {comment.user?.name || "Unknown"} –{" "}
        <span className="text-gray-500 text-xs">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-gray-800">{comment.content}</p>
      {user?._id === comment.user?._id && (
        <div className="mt-2 flex gap-3 text-sm">
          <button onClick={() => onEdit(comment)} className="text-blue-600 hover:underline">
            Edit
          </button>
          <button onClick={() => onDelete(comment._id)} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

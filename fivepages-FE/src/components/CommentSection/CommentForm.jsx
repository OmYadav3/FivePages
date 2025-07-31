export default function CommentForm({
  content,
  setContent,
  editingComment,
  submitComment,
  loading,
  cancelEdit,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitComment();
      }}
      className="mb-6"
    >
      <textarea
        className="w-full border rounded-md p-2 mb-2"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {editingComment ? "Update" : "Post"} Comment
      </button>
      {editingComment && (
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={cancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

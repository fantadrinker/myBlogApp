

export default function CreatePostPage() {

	return (<>
		<h2>Create Post</h2>
		<div className="flex flex-row justify-around">
			<textarea placeholder="type your post" />
			<div><span>preview</span></div>
		</div>

		<button> Create </button>
	</>)
}

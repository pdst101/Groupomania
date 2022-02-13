import React, { Fragment, useState, useEffect } from "react";

const ListComments = (props) => {
  const [comments, setComments] = useState([]);
  //get all comments
  const getComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/comments?id=" + props.post
      );
      const jsonData = await response.json();
      setComments(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Comment</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            return (
              <tr key={comment.comment_id}>
                <td>{comment.content}</td>
                <td>{comment.user_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

//   return (
//     <Fragment>
//       <table className="table mt-5 text-center">
//         <thead>
//           <tr>
//             <th>Content</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {props.posts.map((post) => {
//             if (post.author_id === props.loggedUser) {
//               return (
//                 <tr key={post.post_id}>
//                   <td>{post.content}</td>
//                   <td>
//                     <EditPost post={post} />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deletePost(post.post_id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     <CommentPost post={post} />
//                   </td>
//                 </tr>
//               );
//             }
//             return (
//               <tr key={post.post_id}>
//                 <td>{post.content}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </Fragment>
//   );
// };

export default ListComments;

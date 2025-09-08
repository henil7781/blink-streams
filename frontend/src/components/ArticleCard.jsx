// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../css/Home.css";

// const ArticleDetail = () => {
//   const { slug } = useParams();
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/articles/${slug}/`).then((res) => {
//       setArticle(res.data);
//     });
//   }, [slug]);

//   if (!article) return <p>Loading...</p>;

//   return (
//     <div className="home">
//       <h1>{article.title}</h1>
//       <img src={article.image_url} alt={article.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
//       <p style={{ marginTop: "20px", fontSize: "18px" }}>{article.description}</p>
//     </div>
//   );
// };

// export default ArticleDetail;

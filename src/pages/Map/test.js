// import React, { Component } from 'react'
// import ReactDropzone from "react-dropzone";

// export default class test extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       files: []
//     }
//   }
//   onPreviewDrop = (files) => {
//     this.setState({
//       files: this.state.files.concat(files),
//     });
//   }
//   render() {
//     const previewStyle = {
//       display: 'inline',
//       width: 100,
//       height: 100,
//     };

//     return (
//       <div className="app">
//         <ReactDropzone
//           accept="image/*"
//           onDrop={this.onPreviewDrop}
//         >
//           Drop an image, get a preview!
//         </ReactDropzone>
//         <div>
//             <h3>Previews</h3>
//             {this.state.files.map((file) => (
//               <img
//                 alt="Preview"
//                 key={file.preview}
//                 src={file.preview}
//                 style={previewStyle}
//               />
//             ))}
//           </div>
//       </div>
      
//     );
//   }
// }
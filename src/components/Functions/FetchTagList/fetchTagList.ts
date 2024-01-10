// import { useState, useEffect } from 'react';
// import TagItem from '../../../../express/src/types/TagItem';

// function useFetchTagList() {
//   const [tagList, setTagList] = useState<TagItem[]>([]);

//   const fetchTagList = () => {
//     fetch('http://localhost:3000/api/sample/tags')
//       .then((response) => response.json())
//       .then((data) => {
//         const updatedTagList: TagItem[] = data['tags'].map((element: TagItem) => ({
//           name: element.name,
//           _id: element._id,
//         }));
//         setTagList(updatedTagList);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     fetchTagList();
//   }, []);

//   return tagList;
// }

// export default useFetchTagList;

import { useState, useEffect } from 'react';
import TagItem from '../../../../express/src/types/TagItem';

function useFetchTagList() {
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sample/tags');
        const data = await response.json();
        
        const updatedTagList: TagItem[] = data.tags.map((element: TagItem) => ({
          name: element.name,
          _id: element._id,
        }));

        setTagList(updatedTagList);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTagList();
  }, []);

  return tagList;
}

export default useFetchTagList;

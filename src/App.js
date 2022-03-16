import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import './App.scss';

const IMAGES_PER_PAGE = 3;

function App() {
  const [slugList, setSlugList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetch('https://picsum.photos/v2/list');
    const images = await response.json();

    const slugList = images.map(({ url }) => {
      const urlParts = url.split('/');
      const slug = urlParts[urlParts.length - 1];
      return slug;
    });

    setSlugList(slugList);
    setIsLoading(false);
  };

  const handleClick = () => {
    setPage((page) => {
      if ((page + 1) * IMAGES_PER_PAGE + IMAGES_PER_PAGE > slugList.length) {
        return 0;
      }
      return page + 1;
    });
  };

  return (
    <div className="App">
      <div className="images-container">
        {isLoading ? (
          <Loader />
        ) : (
          slugList
            .slice(page * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE + 3)
            .map((slug) => {
              return (
                <img
                  key={slug}
                  src={`http://source.unsplash.com/${slug}`}
                  alt={slug}
                />
              );
            })
        )}
      </div>
      {!isLoading && (
        <button className="next-images-btn" onClick={handleClick}>
          Next
        </button>
      )}
    </div>
  );
}

export default App;

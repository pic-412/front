import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './App.css';

function App() {
  const [people, setPeople] = useState([
    {
      name: '1',
      url: 'https://blog-static.kkday.com/ko/blog/wp-content/uploads/malaysia_kota_kinabalu_pulau_tiga.jpg',
    },
    {
      name: '2',
      url: 'https://cdn.informaticsview.com/news/photo/202408/485_1741_4410.jpg',
    },
    {
      name: '3',
      url: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/oa_fqRsHcmBRlEPCIjSKOHDW_gs.jpg',
    },
  ]);

  const onSwipe = (direction: string, nameToDelete: string) => {
    console.log('방향: ' + direction + ', 삭제된 사용자: ' + nameToDelete);
    // 실제로 카드를 제거하는 로직 추가
    setPeople((prevPeople) => prevPeople.filter((person) => person.name !== nameToDelete));
  };

  return (
    <div className="app">
      <div className="card-container">
        {people.map((person) => (
          <TinderCard
            key={person.name}
            className="swipe"
            onSwipe={(dir) => onSwipe(dir, person.name)}
          >
            <div
              className="card"
              style={{
                backgroundImage: `url(${person.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default App;

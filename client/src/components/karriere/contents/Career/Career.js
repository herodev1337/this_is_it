import Search from '../Header, Search, Filter/Search';
import { Modal } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';

const posts = [
  {
    name: 'Game Designer',
    type: 'Duales Studium',
    core: 'Konzeption, Planung und Umsetzung von Spielen/Spielinhalten',
    use: 'Entwicklungsstudios für Spiele, Online-Agenturen, Online-Marketing',
    info:
      'Meist an privaten Universitäten -> hohe Kosten, o	https://www.medien-studieren.net/studiengaenge/game-design/#studienformen',
  },
  {
    name: 'Game Artist',
    type: 'schulische Ausbildung',
    core:
      'Visuelle Gestaltung von Spielen, Level-Design(Landschaften und Storyboards), Modelle erstellen und Character-Design',
    use: 'Spielehersteller, Gamestudios, Film & Fernsehen',
    info:
      'Unvergütete Ausbildung, https://www.ausbildung.de/berufe/game-artist/',
  },
  {
    name: 'Medieninformatik',
    type: '(Duales) Studium',
    core:
      'Verwaltung und Wartung von Rechnersystemen, Implementierung von Internetanwendungen, Erstellen von interaktiven Anwendungen',
    use: 'Netzwerkunternehmen, Forschung, IT-Consulting',
    info: 'https://www.studycheck.de/studium/medieninformatik',
  },
  {
    name: 'Mediengestalter Digital und Print',
    type: 'Duale Ausbildung',
    core:
      'Gestaltung digitaler und gedruckter Medien, Analyse von Kundenwünschen',
    use: 'Verlagshäuser, Werbeagenturen, Druckereien',
    info: 'https://www.ausbildung.de/berufe/mediengestalter-digital-print/',
  },
  {
    name: 'Game Programmer',
    type: 'Weiterbildung',
    core:
      'Umsetzen von Spielideen und Spielmechaniken, Anpassen von Spielen an unterschiedliche Betriebssysteme und Plattformen, 3D-Animation',
    use: 'Spielestudios, Software- und Datenbankanbieter',
    info: 'https://www.ausbildung.de/berufe/game-programmer/',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
  },
];

const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter(post => {
    const postName = post.name.toLowerCase();
    return postName.includes(query.toLowerCase());
  });
};

const Career = () => {
  //searchbar
  const query = document.getElementsByName('s').value;
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredPosts = filterPosts(posts, searchQuery);
  //Modal
  const [show, setShow] = useState(Array(posts.length).fill(false));
  const handleClose = () => {
    setShow(Array(posts.length).fill(false));
    console.log('dasd');
  };
  const handleShow = i => {
    setShow(show.map((_, j) => i === j));
  };

  return (
    <div id="career">
      <div id="search">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div id="card-div">
        {filteredPosts.map((post, i) => (
          <>
            <div className="card" key={i} onClick={() => handleShow(i)}>
              <div className="card-inner">
                <div className="card-front">
                  <h2>{post.name}</h2>
                </div>
                <div className="card-back">
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
            <Modal show={show[i]} onHide={handleClose}>
              <div id="card-big">
                <h3>{post.name}</h3>
                <h2>Ausbildungsart</h2>
                <p>{post.type}</p>
                <h2>Kerntätigkeiten</h2>
                <p>{post.core}</p>
                <h2>Einsatzmöglichkeiten</h2>
                <p>{post.use}</p>
                <h2>Weitere Infos</h2>
                <p>{post.info}</p>
              </div>

              <button onClick={handleClose}>Close</button>
            </Modal>
          </>
        ))}
      </div>
    </div>
  );
};

export default Career;

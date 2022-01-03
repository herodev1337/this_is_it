import Search from '../Header, Search, Filter/Search';
import { Modal } from 'react-bootstrap';
import React from 'react';
import { useState } from 'react';
import Filter from '../Header, Search, Filter/Searchfilter';

import styles from "styles/scss/karriere.module.scss"

const posts = [
  {
    name: 'Game Designer',
    type: 'Duales Studium',
    core: 'Konzeption, Planung und Umsetzung von Spielen/Spielinhalten',
    use: 'Entwicklungsstudios für Spiele, Online-Agenturen, Online-Marketing',
    info:
      'Meist an privaten Universitäten -> hohe Kosten, o	https://www.medien-studieren.net/studiengaenge/game-design/#studienformen',
    field: 'Kreativität'  
  },
  {
    name: 'Game Artist',
    type: 'schulische Ausbildung',
    core:
      'Visuelle Gestaltung von Spielen, Level-Design(Landschaften und Storyboards), Modelle erstellen und Character-Design',
    use: 'Spielehersteller, Gamestudios, Film & Fernsehen',
    info:
      'Unvergütete Ausbildung, https://www.ausbildung.de/berufe/game-artist/',
    field: 'Kreativität'  
  },
  {
    name: 'Medieninformatik',
    type: '(Duales) Studium',
    core:
      'Verwaltung und Wartung von Rechnersystemen, Implementierung von Internetanwendungen, Erstellen von interaktiven Anwendungen',
    use: 'Netzwerkunternehmen, Forschung, IT-Consulting',
    info: 'https://www.studycheck.de/studium/medieninformatik',
    field: 'Kreativität'
  },
  {
    name: 'Mediengestalter Digital und Print',
    type: 'Duale Ausbildung',
    core:
      'Gestaltung digitaler und gedruckter Medien, Analyse von Kundenwünschen',
    use: 'Verlagshäuser, Werbeagenturen, Druckereien',
    info: 'https://www.ausbildung.de/berufe/mediengestalter-digital-print/',
    field: 'Kreativität'
  },
  {
    name: 'Game Programmer',
    type: 'Weiterbildung',
    core:
      'Umsetzen von Spielideen und Spielmechaniken, Anpassen von Spielen an unterschiedliche Betriebssysteme und Plattformen, 3D-Animation',
    use: 'Spielestudios, Software- und Datenbankanbieter',
    info: 'https://www.ausbildung.de/berufe/game-programmer/',
    field: 'Technik'
  },
  {
    name: 'Fachinformatiker*in für Anwndungsentwicklung',
    type: 'Duale Ausbildung',
    core: 'Software nach Kundenwunsch entwickeln, Anwendungen testen und anpassen, User schulen und betreuen',
    use: 'Großunternehmen, Internetagenturen, Stadtverwaltung',
    info: 'https://www.ausbildung.de/berufe/fachinformatiker-anwendungsentwicklung/ ',
    field: 'Technik'
  },
  {
    name: 'Fachinformatiker*in Systemintegration',
    type: 'Duale Ausbildung',
    core: 'Analyse von Kundenwünschen, Netzwerkeinrichtung, IT-Support und Netzwerkwartung',
    use: 'Bürogebäude, unternehmensinterne Vernetzung',
    info: 'https://www.ausbildung.de/berufe/fachinformatiker-systemintegration/',
    field: 'Technik'
  },
  {
    name: 'Fachinformatiker*in Digitale Vernetzung',
    type: 'Duale Ausbildung',
    core: 'Vernetzen von IT-Systemen und Anwendungen, Automatisieren von Prozessen und Produktion, Daten sichern',
    use: 'Industrie',
    info: 'https://www.ausbildung.de/berufe/fachinformatiker-fuer-digitale-vernetzung/',
    field: 'Technik'
  },
  {
    name: 'Fachinformatiker*in Daten und Prozessanalyse',
    type: 'Duale Ausbildung',
    core: 'Analyse von Arbeits- und Geschäftsprozessen, Bereitstellen von Daten, Optimierung digitaler Geschäftsmodelle, Datenschutz- und Sicherheit',
    use: 'Informations- und Kommunikationstechnik, Öffentlicher Dienst, IT-Dienstleister',
    info: 'https://www.ausbildung.de/berufe/fachinformatiker-daten-und-prozessanalyse/',
    field: 'Technik'
  },
  {
    name: 'IT-Systemelektroniker*in',
    type: 'Duale Ausbildung',
    core: 'Planung, Installation und Wartung von IT-Systemen, Kundenberatung',
    use: 'Büro, Außendienst beim Kunden',
    info: '',
    field: 'Technik'
  },
  {
    name: 'Informatik',
    type: 'Studium',
    core: 'Projektplanung, Software-Engineering, IT-Vertrieb und Management',
    use: 'Industire, IT-Consulting, Öffentlicher Dienst',
    info: 'https://www.studycheck.de/studium/informatik',
    field: 'Technik'
  },
  {
    name: 'Technische Informatik',
    type: 'Studium',
    core: 'Entwerfen, Produzieren und Betreiben von IT-Systemen, Entwickeln von Steuerungssystemen, Zusammenstellen von Rechnernetzen',
    use: 'Industrie, Multimedia- und Technikfirmen, Univesitäten',
    info: 'https://www.studycheck.de/studium/technische-informatik',
    field: 'Technik'
  },
  {
    name: 'Angewandte Informatik',
    type: 'Studium',
    core: 'Programmierung, Mediendesign, Erstellen von Webapplikationen',
    use: 'Industrie, Öffentlicher Dienst, Benutzerservice und Support',
    info: 'https://www.studycheck.de/studium/angewandte-informatik',
    field: 'Technik'
  },
  {
    name: 'Telekommunikationsinformatik',
    type: 'Studium',
    core: 'Apps planen und programmieren, Netzwerke einrichten, Systemdesign',
    use: 'IT-Consulting, Industrie, Öffentlicher Dienst',
    info: 'https://www.aubi-plus.de/berufe/bachelor-of-engineering-telekommunikationsinformatik-1216/',
    field: 'Technik'
  },
  {
    name: 'IT-Security',
    type: 'Studium',
    core: 'Überprüfen der Sicherheit von IT-Systemen, Verhindern von Datenmissbrauch',
    use: 'Industrie, Öffentlicher Dienst',
    info: 'https://www.cb.hs-mittweida.de/studienangebote-der-fakultaet/it-sicherheit/',
    field: 'Technik'
  },
  {
    name: 'Robotik',
    type: 'Studium',
    core: 'Aufbau komplexer Robotersysteme, Automatisierungstechnik, Einsatz von künstlicher Intelligenz',
    use: 'Forschung, Consulting, Automobilindustrie/Anlagenbau/Maschinenbau',
    info: 'https://www.ausbildung.de/berufe/duales-studium-robotik/',
    field: 'Technik'
  },
  {
    name: 'Kaufmann/frau für IT-Systemmanagement',
    type: 'Duale Ausbildung',
    core: 'Kundenberatung, Marketing, Beschaffung von Hard- und Software',
    use: 'Verkauf / Vertrieb von Hard- und Software',
    info: 'https://www.ausbildung.de/berufe/kaufmann-fuer-it-systemmanagement/',
    field: 'Kommunikation'
  },
  {
    name: 'Fachberater*in Softwaretechnik',
    type: 'Duale Ausbildung',
    core: 'Testen und Warten von IT-Systemen, Prozessoptimierung',
    use: 'IT-Consulting',
    info: 'https://www.ausbildung.de/berufe/fachberater-softwaretechniken/',
    field: 'Soziales'
  },
  {
    name: 'Game Producer',
    type: 'Weiterbildung',
    core: 'Zeitmanagement einer Spieleproduktion, Kostenkalkulation, Kommunikation mit anderen beteiligten Experten',
    use: 'Gaming Studios, Verlage',
    info: 'https://www.ausbildung.de/berufe/game-producer/ ',
    field: 'Wirtschaft'
  },
  {
    name: 'Kaufmann/frau für Digitalisierungsmanagement',
    type: 'Duale Ausbildung',
    core: 'Vertragsgestaltung, Entwicklung von IT-Lösungen, Controlling(Finanzen)',
    use: 'Büro, Außendienst beim Kunden',
    info: 'https://www.azubiyo.de/berufe/kaufmann-digitalisierungsmanagement/?gclid=Cj0KCQjw8p2MBhCiARIsADDUFVFZzOtw4rq97OhcfOg-PIV0jI_AarUjzIhq7nxL7hN0vUETZRSB8VUaAqbUEALw_wcB ',
    field: 'Wirtschaft'
  },
  {
    name: 'Verwaltungsinformatik',
    type: 'Studium',
    core: 'Softwareengineering, Qualitätssicherung, wirtschaftsinformatische Tätigkeiten',
    use: 'Öffentlicher Dienst',
    info: 'https://www.ausbildung.de/berufe/duales-studium-verwaltungsinformatik/ ',
    field: 'Wirtschaft'
  },
  {
    name: 'Scientific Programming',
    type: 'Studium/Duale Ausbildung (2 Abschlüsse in einem)',
    core: 'Softwareengineering, Qualitätssicherung',
    use: 'Industrie, Öffentlicher Dienst',
    info: 'https://www.ausbildung.de/berufe/duales-studium-scientific-programming/ ',
    field: 'Forschung'
  },
  {
    name: '',
    type: '',
    core: '',
    use: '',
    info: '',
    field: ''
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
const filterForChosen = (posts, chosen) => {
  if (!chosen) {
    return posts}

  return posts.filter(post => {
     return post.field === chosen 
  })
}


const Career = () => {
  //searchbar
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPosts = filterPosts(posts, searchQuery);
  //Filter
  const [chosen, setChosen] = useState("")
  const DoubleFilteredPosts = filterForChosen(filteredPosts, chosen)
  //Modal
  const [show, setShow] = useState(Array(posts.length).fill(false));
  const handleClose = () => {
    setShow(Array(posts.length).fill(false));
  };
  const handleShow = i => {
    setShow(show.map((_, j) => i === j));
  };

  return (
    <div id={styles.career}>
      <div id={styles.search}>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter chosen={chosen} setChosen={setChosen} />
      </div>
      <div id={styles.cardDiv}>
        {DoubleFilteredPosts.map((post, i) => (
          <>
            <div className={styles.card} key={i} onClick={() => handleShow(i)}>
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <h2>{post.name}</h2>
                </div>
                <div className={styles.cardBack}>
                  <p>{post.description}</p>
                </div>
              </div>
            </div>
            <Modal show={show[i]} onHide={handleClose}>
              <div id={styles.cardBig}>
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

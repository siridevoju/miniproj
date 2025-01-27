import { useState } from 'react';
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const schemesData = {
    "Telangana": [
        { name: "Rythu Bandhu", image: "https://th.bing.com/th/id/OIP.2hdg6xxVvzSglnq46FQX0QHaE8?rs=1&pid=ImgDetMain", link: "https://rythubandhu.info/" },
        { name: "KCR Kits", image: "https://th.bing.com/th/id/OIP._jMiSrKXE1Ds3kwcAMR_TQHaHx?rs=1&pid=ImgDetMain", link: "https://hyderabad.telangana.gov.in/scheme/kcr-kit/" },
        { name: "Aasara Pension Scheme", image: "https://pradhanmantriyojana.co.in/wp-content/uploads/2019/12/Aasara-Pension-Scheme-Telangana-.jpg", link: "https://hyderabad.telangana.gov.in/scheme/aasara-pensions/" }
    ],
    "Andhra Pradesh": [
        { name: "YSR Rythu Bharosa", image: "https://www.ysrcongress.com/sites/default/files/article_images/2020/07/7/YSR-For-Rythu-Bharosa.jpg", link: "https://ysrrythubharosa.ap.gov.in" },
        { name: "YSR Asara", image: "https://th.bing.com/th/id/OIP.w04k-hetmJqZau6wzkf11wAAAA?rs=1&pid=ImgDetMain", link: "https://navasakam.ap.gov.in" },
        { name: "YSR Pension Kanuka", image: "https://pmmodiyojanaye.in/wp-content/uploads/2023/08/YSR-Pension-Kanuka--1024x683.jpg", link: "https://sspensions.ap.gov.in" }
    ],
    "Odisha": [
        { name: "KALIA Scheme", image: "https://pwonlyias.com/wp-content/uploads/2023/12/KALIA-Scheme.webp", link: "https://kalia.odisha.gov.in" },
        { name: "Biju Swasthya Kalyan Yojana", image: "https://th.bing.com/th/id/OIP.Y2_5kemICwywD2xdZ5zkKgHaDt?rs=1&pid=ImgDetMain", link: "https://bsky.odisha.gov.in" }
    ],
    "Karnataka": [
        { name: "Annabhagya Scheme", image: "https://hindigovtscheme.com/wp-content/uploads/2023/05/Karnataka-Raitha-Siri-Yojana.png", link: "https://ahara.kar.nic.in" },
        { name: "Raitha Siri", image: "https://2.bp.blogspot.com/-9myVtU2yqBw/WLV-EnRo1-I/AAAAAAAAAKA/_i3S7cejCWUKsQ2UOVACCj84YKSgtOFbgCLcB/s1600/Anna%2BBhagya%2BYojana%2BScheme.png", link: "https://raitamitra.karnataka.gov.in" }
    ],
    "Tamil Nadu": [
        { name: "Amma Two Wheeler Scheme", image: "https://images.ctfassets.net/uwf0n1j71a7j/5tCn8rVVrjiAztiRbhQVK7/e4a40536b31ccb732de0126080059f67/amma-two-wheeler-or-scooter-scheme.png", link: "https://tamilnadumahalir.org" },
        { name: "Pudhumai Penn Scheme", image: "https://sarkariyojnaa.org/wp-content/uploads/2023/04/TN-Pudhumai-Penn-Scheme.jpg", link: "https://pudhumaipenn.tn.gov.in" }
    ],

};

const StateSchemes = () => {
    const [search, setSearch] = useState('');

    const filteredStates = Object.keys(schemesData).filter(state =>
        state.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <NavbarComponent />

            <div className="container mx-auto p-4">
                <input
                    type="text"
                    placeholder="Search by state"
                    className="w-full p-2 border rounded mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {filteredStates.map((state, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-xl font-bold mb-2">{state}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {schemesData[state].map((scheme, idx) => (
                                <div key={idx} className="border p-4 rounded shadow-lg">
                                    <img src={scheme.image} alt={scheme.name} className="w-full h-40 object-cover rounded" />
                                    <h2 className="text-lg font-bold mt-2">{scheme.name}</h2>
                                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Scheme</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <FooterComponent />
        </div>
    );
};

export default StateSchemes;

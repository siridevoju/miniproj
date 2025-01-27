import FooterComponent from "../../components/FooterComponent/FooterComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const centralSchemesData = [
    { name: "PM-KISAN", image: "https://newslivetv.com/wp-content/uploads/2021/05/pm-Kisan.png", link: "https://pmkisan.gov.in" },
    { name: "Ayushman Bharat", image: "https://assets.entrepreneur.com/content/3x2/2000/20200214125255-Feature.jpeg", link: "https://pmjay.gov.in" },
    { name: "Pradhan Mantri Awas Yojana", image: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/pradhan-mantri-awas-yojana-pmay-urban.jpg", link: "https://pmaymis.gov.in/" },
    { name: "Mahatma Gandhi National Rural Employment Guarantee Act", image: "https://th.bing.com/th/id/OIP.ScmSlP_IhymPW9v6YOiBqgHaDq?rs=1&pid=ImgDetMain", link: "https://nrega.nic.in" },
    { name: "Swachh Bharat Abhiyan", image: "https://st.adda247.com/https://adda247jobs-wp-assets-prod.adda247.com/articles/wp-content/uploads/2023/08/19180127/Swachh-Bharat-Abhiyan.jpg", link: "https://swachhbharatmission.gov.in" }
];

const CentralSchemes = () => {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Central Government Schemes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {centralSchemesData.map((scheme, idx) => (
                        <div key={idx} className="border p-4 rounded shadow-lg">
                            <img src={scheme.image} alt={scheme.name} className="w-full h-40 object-cover rounded" />
                            <h3 className="text-lg font-bold mt-2">{scheme.name}</h3>
                            <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Scheme</a>
                        </div>
                    ))}
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};

export default CentralSchemes;

import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect } from "react";


const HomePage = () => {

    const navigate = useNavigate();
    return (<>
        <img src="../public/images/באנר-דף-בית.png" alt="" className="img-banner-home" />
        <img src="../public/images/אודות דף בית .png" alt="" className="img-banner-about" />
        <h1>המבחר שלנו</h1>
        <div className="img-container">
            <img
                src="/images/כריכים.jpeg"
                alt="כריכים"
                className="img-banner"
                onMouseEnter={(e) => (e.currentTarget.src = "/images/כריכים למעה.jpeg")}
                onMouseLeave={(e) => (e.currentTarget.src = "/images/כריכים.jpeg")}
                onClick={() => navigate("/home?category=סנדוויצים")}
            />
            <img
                src="/images/סלטים.jpeg"
                alt="סלטים"
                className="img-banner"
                onMouseEnter={(e) => (e.currentTarget.src = "/images/סלט למעלה.jpeg")}
                onMouseLeave={(e) => (e.currentTarget.src = "/images/סלטים.jpeg")}
                onClick={() => navigate("/home?category=סלטים")}

            />
            <img
                src="/images/ציפס.jpeg"
                alt="צ'יפס"
                className="img-banner"
                onMouseEnter={(e) => (e.currentTarget.src = "/images/ציפס למעלה.jpeg")}
                onMouseLeave={(e) => (e.currentTarget.src = "/images/ציפס.jpeg")}
                onClick={() => navigate("/home?category=תוספות")}

            />
            <img
                src="/images/נקניק.jpeg"
                alt="נקניק"
                className="img-banner"
                onMouseEnter={(e) => (e.currentTarget.src = "/images/נקניק למעלה.jpeg")}
                onMouseLeave={(e) => (e.currentTarget.src = "/images/נקניק.jpeg")}
                onClick={() => navigate("/home?category=סנדוויצים")}

            />
        </div>
        <input type="button" value={"לכל החנות "} className="store-button" onClick={() => {
            navigate("/home")
        }
        } />
        <img src="../public/images/דרושים.png" alt="" className="img-banner-about" />


        <div className="images-container">

            {/* ✅ תמונה שנייה (בצד שמאל) עם טקסט מעגלי מאחוריה */}
            <div className="image-box">
                <div className="circle-container">
                    <svg viewBox="0 0 200 200" className="rotating-circle">
                        <defs>
                            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                        </defs>
                        <text className="circle-text">
                            <textPath href="#circlePath">
                                TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY!TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY! TAKEAWAY!
                            </textPath>
                        </text>
                    </svg>
                </div>
                <img src="/images/אלמנט אתר.png" alt="אלמנט אתר" className="img-banner-circle" />
            </div>
            {/* ✅ תמונה ראשונה (בצד ימין) */}
            <div className="image-box">
                <img src="/images/קפצו.png" alt="קפצו" className="img-banner-circle" />
            </div>

        </div>
    </>);
}

export default HomePage;
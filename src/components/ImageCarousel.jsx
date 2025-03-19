import { useState } from "react";
import "./ImageCarousel.css"; // ייבוא קובץ העיצוב

const ImageCarousel= ({ images, defaultImage }) => {
    const [mainImage, setMainImage] = useState(defaultImage || images[0]);

    return (
        <div className="gallery-container">
            {/* ✅ תמונה ראשית */}
            <img src={mainImage} alt="Main" className="main-image" />

            {/* ✅ תמונות קטנות מתחת */}
            <div className="thumbnail-container">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`thumbnail ${mainImage === img ? "active" : ""}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;

interface DescriptionComponentProps {
    title?: string;
    description?: string;
    image?: string;
    alt?: string;
    direction: "left" | "right";
}


export default function DescriptionComponent({ title, description, image, alt, direction }: DescriptionComponentProps) {
    return (
        <div className={`flex items-center justify-center p-4 ${direction === "right" ? "flex-row-reverse" : "flex-row"}`}>
            {image && <img src={image} alt={alt} className="w-auto h-full my-2" />}
            <div className="text-center mx-[20%] max-mx">
                {title && <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>}
                {description && <p className="text-gray-700 text-white">{description}</p>}
            </div>
        </div>
    );
}
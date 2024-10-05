import Image from "next/image";

export default function UserImage(
    { 
        divClassName, 
        imageClassName, 
        userImage,
        width = 70,
        height = 70
    }: 
    { 
        divClassName?: string; 
        userImage: string;
        imageClassName?: string;
        width?: number;
        height?: number;
    }) {
    return(
        <div className={divClassName}>
          <Image 
          src={userImage} 
          alt="User profile picture" 
          className={imageClassName} 
          height={width}
          width={height}
          />
        </div>
    );
}
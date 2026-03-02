type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

function Image(props: ImageProps, fallbackSrc: string = "/not-found.svg") {
  return (
    <img
      {...props}
      className={`${props.className} object-cover`}
      onError={(e) => (e.currentTarget.src = fallbackSrc)}
    />
  );
}

export default Image;

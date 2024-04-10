export default function RedeemPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { image } = searchParams;
  const downloadUrl = decodeURIComponent(image);

  return (
    <div className="flex flex-col items-center">
      <h1>Image Generated</h1>
      <img src={downloadUrl} alt="Generated Image" />
      <a href={downloadUrl} download>
        Download
      </a>
    </div>
  );
}

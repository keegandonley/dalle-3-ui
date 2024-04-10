import Image from "next/image";

export default function RedeemPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { imageUrl } = searchParams;
  const downloadUrl = decodeURIComponent(imageUrl);

  return (
    <div className="flex flex-col items-center">
      <h1>Image Generated</h1>
      <Image
        width={1792}
        height={1024}
        src={downloadUrl}
        alt="Generated Image"
      />
      <a href={downloadUrl} download>
        Download
      </a>
    </div>
  );
}

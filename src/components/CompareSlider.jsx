import ReactCompareImage from "react-compare-image";

export default function CompareSlider({
  before,
  after,
  filter,
  sliderPercentage = 0.5,
  setSliderPercentage = () => {},
}) {
  if (!before || !after) return null;

  const rightImageStyle = filter
    ? {
        filter: `
          brightness(${1 + parseInt(filter.brightness || "0", 10) / 100})
          contrast(${1 + parseInt(filter.contrast || "0", 10) / 100})
          saturate(${1 + parseInt(filter.colorCorrection || "0", 10) / 100})
        `,
      }
    : undefined;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10">
      <ReactCompareImage
        leftImage={before}
        rightImage={after}
        rightImageCss={rightImageStyle}
        sliderLineColor="#ffffff"
        handleSize={40}
        sliderPositionPercentage={sliderPercentage}
        onSliderPositionChange={setSliderPercentage}
      />
    </div>
  );
}

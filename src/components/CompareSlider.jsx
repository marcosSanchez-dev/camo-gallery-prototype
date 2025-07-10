import ReactCompareImage from "react-compare-image";

export default function CompareSlider({
  before,
  after,
  filter, // Ahora es un string CSS
  sliderPercentage = 0.5,
  setSliderPercentage = () => {},
}) {
  if (!before || !after) return null;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10">
      <ReactCompareImage
        leftImage={before}
        rightImage={after}
        rightImageCss={{ filter }} // Aplica el string CSS directamente
        sliderLineColor="#ffffff"
        handleSize={40}
        sliderPositionPercentage={sliderPercentage}
        onSliderPositionChange={setSliderPercentage}
      />
    </div>
  );
}

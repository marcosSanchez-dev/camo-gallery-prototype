import ReactCompareImage from "react-compare-image";

export default function CompareSlider({ before, after }) {
  if (!before || !after) return null;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-xl border border-white/10">
      <ReactCompareImage
        leftImage={before}
        rightImage={after}
        sliderLineColor="#ffffff"
        handleSize={40}
        sliderPositionPercentage={0.5}
      />
    </div>
  );
}

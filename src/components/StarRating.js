import React from "react";
function Star({ marked, starId }) {
  return (
    <span
      star-id={starId}
      style={{ color: "#ff9933", cursor: "pointer" }}
      role="button"
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
}

export default function StarRating({ rating, vote }) {
  const [selection, setSelection] = React.useState(0);

  const hoverOver = event => {
    let val = 0;
    if (event && event.target && event.target.getAttribute("star-id"))
      val = event.target.getAttribute("star-id");
    setSelection(val);
  };
  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={event =>
        vote(+event.target.getAttribute("star-id") || +selection)
      }
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1} `}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
}

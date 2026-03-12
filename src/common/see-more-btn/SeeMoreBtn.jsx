import "./SeeMoreBtn.css";

function SeeMoreBtn({ text }) {
  return (
    <div className="see-more-btn__container">
      <div>
        <hr />
        <button className="see-more-btn__text">{text.toUpperCase()}</button>
        <hr />
      </div>
    </div>
  );
}

export default SeeMoreBtn;

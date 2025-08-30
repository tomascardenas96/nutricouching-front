import "./ResourceHeader.css";

function ResourceHeader({ title }) {
  return (
    <div className="plan-header">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <hr />
    </div>
  );
}

export default ResourceHeader;

function ProductCard(props) {
    return (
      <div className="card">
        <img src={props.image} alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.category}</p>
        </div>
      </div>
    );
  }
import './card.css'
// card with shadow
const Card = ({children,title,action, className=""}) => {
    return (
        <div className={`box-shadow ${className}`}>
            {title && <div className="d-flex jcb aic pb-2">
                <div className="title-md">{title}</div>
                <div>
                    {action && <div className="card-action-icon">A</div>}
                </div>
            </div>}
             {children}    
        </div> 
    )
}

export default Card
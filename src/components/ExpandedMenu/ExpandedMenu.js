import './ExpandedMenu.css'

function ExpandedMenu({ items, }) {
    return (
        <div className="expandedMenu">
            {items.map((i) => { return <div className='icon'><img src={i} width={"75px"} height={"75px"} alt={""}></img></div> })}
        </div>
    );
};

export default ExpandedMenu;
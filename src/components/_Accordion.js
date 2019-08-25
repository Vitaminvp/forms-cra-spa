import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
export function AccordionItem(props) {
  const style = {
    collapsed: {
      display: "none"
    },
    expanded: {
      display: "block"
    },
    buttonStyle: {
      display: "block",
      width: "100%"
    },
    buttonStyleCollapsed: {
      display: "block",
      width: "100%",
      backgroundColor: "#888",
      color: "white",
      cursor: "auto"
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={
          props.isCollapsed ? style.buttonStyleCollapsed : style.buttonStyle
        }
        onClick={() => props.handleClick()}
      >
        <FormattedMessage id={props.label} defaultMessage="Accordion tab" />
      </Button>

      <div
        className="collapse-content"
        style={props.isCollapsed ? style.collapsed : style.expanded}
        aria-expanded={props.isCollapsed}
      >
        {props.children}
      </div>
    </div>
  );
}

export function _Accordion(props) {
  const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);

  const changeItem = itemIndex => {
    if (typeof props.onItemClick === "function") props.onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = props.children.filter(
    item => item.type.name === "AccordionItem"
  );

  return (
    <div className="wrapper">
      {items.map(({ props }, index) => (
        <AccordionItem
          key={index}
          isCollapsed={bindIndex === props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </div>
  );
}

_Accordion.defaultProps = {
  defaultIndex: 2
};

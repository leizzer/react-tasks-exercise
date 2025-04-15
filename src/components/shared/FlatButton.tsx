import React from "react";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FlatButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`flat-button ${isActive ? "flat-button-active" : "flat-button-inactive"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FlatButton;

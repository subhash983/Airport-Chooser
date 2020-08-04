import React, {
  useState,
  useCallback,
  Suspense,
  useMemo,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";

const AirportDropDown = React.lazy(() => import("./AirportDropDown"));

const AirportDropDownContainer = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
`;

const AirportChooserContainer = styled.div`
  width: 300px;
`;

const SelectButton = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 400;
  width: 276px;
  height: 30px;
  background-color: #f2f2f2;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1%;
  padding-left: 7%;
`;

const AirportChooser = ({ airports }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const airportRef = useRef();

  const handleEsc = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowDropdown(false);
    }
  }, []);

  const handleOutsideClick = useCallback((event) => {
    if (
      !airportRef.current.contains(event.target) &&
      event.target !== airportRef.current
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleEsc, handleOutsideClick]);

  const memoizedAirports = useMemo(
    () => airports.sort((a1, a2) => (a1.name <= a2.name ? -1 : 1)),
    [airports]
  );

  const toggleDropdownVisbility = function () {
    setInitialLoad(false);
    setShowDropdown(!showDropdown);
  };

  const handleAirportItemClick = useCallback(function (event) {
    const target =
      event.target.tagName === "DIV"
        ? event.target.parentElement
        : event.target;
    setSelectedAirport({
      city: target.dataset.airportname,
      name: target.dataset.airportcode,
      code: target.dataset.airportcity,
    });
    setShowDropdown(false);
  }, []);

  return (
    <AirportChooserContainer ref={airportRef}>
      <SelectButton onClick={toggleDropdownVisbility}>
        {selectedAirport
          ? `${selectedAirport.name || selectedAirport.city}(${
              selectedAirport.code
            })`
          : "Choose Airport"}
      </SelectButton>

      {!initialLoad && (
        <Suspense fallback={<div>Loading...</div>}>
          <AirportDropDownContainer show={showDropdown}>
            <AirportDropDown
              airports={memoizedAirports}
              handleAirportItemClick={handleAirportItemClick}
            />
          </AirportDropDownContainer>
        </Suspense>
      )}
    </AirportChooserContainer>
  );
};

export default AirportChooser;

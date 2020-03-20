import { useCallback } from "react";

const useToggle = (defaultIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const toggleIsOpen = useCallback(
    open => setIsOpen(typeof open === 'boolean' ? open : !isOpen),
    [isOpen]
  );

  return [isOpen, toggleIsOpen]
}

export default useToggle;
import CustomButton from "./CustomButton";

export interface AlertDialogProps {
  title: string;
  description: string;
  visible: boolean;
  onClose: () => void;
  onUserAction?: () => void;
  onUserActionLabel?: string;
}
function AlertDialog({
  title,
  description,
  visible,
  onClose,
  onUserAction,
  onUserActionLabel,
}: AlertDialogProps) {
  const handleUserAction = () => {
    if (onUserAction) {
      onUserAction();
    }
    return onClose();
  };

  if (!visible) return null;

  return (
    <div id="alert-dialog">
      <h6>
        <label>{title}</label>
      </h6>
      <p>{description}</p>
      <div>
        {onUserActionLabel && onUserAction && (
          <CustomButton
            title={onUserActionLabel}
            variant="primary"
            onClick={handleUserAction}
            fontSize={1}
            style={{ width: "100%", justifyContent: "center" }}
          />
        )}
        <CustomButton
          onClick={onClose}
          title={"Close"}
          variant="warning"
          fontSize={1}
          style={{ width: "100%", justifyContent: "center" }}
        />
      </div>
    </div>
  );
}

export default AlertDialog;

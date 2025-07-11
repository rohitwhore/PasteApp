import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./View.css"; // ✅ Import the CSS

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((paste) => paste._id === id);

  if (!paste) return <div className="text-center text-xl py-10">Paste not found.</div>;

  return (
    <div className="view-paste-container">
      <div className="view-paste-wrapper">
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="view-paste-title"
        />

        <div className="view-paste-editor">
          <div className="view-paste-header">
            <div className="window-controls">
              <div className="window-circle red" />
              <div className="window-circle yellow" />
              <div className="window-circle green" />
            </div>

            <div className="copy-button" onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to Clipboard");
            }}>
              <Copy className="hover:text-green-500" size={20} />
            </div>
          </div>

          <textarea
            value={paste.content}
            disabled
            placeholder="Write Your Content Here...."
            className="view-paste-textarea"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

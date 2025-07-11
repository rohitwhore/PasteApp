import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import "./Home.css"; // ✅ Import the CSS file

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="home-container">
      <div className="flex-col gap-y-5 items-start">
        <div className="w-full flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`title-input ${pasteId ? "paste-mode" : ""}`}
          />
          <button className="btn" onClick={createPaste}>
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {pasteId && (
            <button className="btn" onClick={resetPaste}>
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="paste-box">
          <div className="paste-box-header">
            <div className="traffic-lights">
              <div className="traffic-light red" />
              <div className="traffic-light yellow" />
              <div className="traffic-light green" />
            </div>
            <div>
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="paste-textarea"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

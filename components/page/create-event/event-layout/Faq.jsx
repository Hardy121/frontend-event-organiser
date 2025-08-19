import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";

const Faq = ({ faqs, setFaqs }) => {
    const [queAnswerInput, setQueAnswerInput] = useState({
        question: '',
        answer: '',
        open: false
    });
    const [addQueAnswer, setAddQueAnswer] = useState(true);
    const [items, setItems] = useState(faqs);

    // Modal state
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ question: "", answer: "" });

    const toggleAnswer = (index) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, open: !item.open } : item
            )
        );
    };

    const openEditModal = (index) => {
        setEditIndex(index);
        setEditData({
            question: items[index].question,
            answer: items[index].answer,
        });
        setIsEditOpen(true);
    };

    const handleEditSave = () => {
        if (editData.question.trim() === "" || editData.answer.trim() === "") return;
        setItems((prev) =>
            prev.map((item, i) =>
                i === editIndex ? { ...item, ...editData } : item
            )
        );
        setFaqs((prev) =>
            prev.map((item, i) =>
                i === editIndex ? { ...item, ...editData } : item
            )
        );
        setIsEditOpen(false);
        setEditIndex(null);
    };

    function handleQueAnswer() {
        if (queAnswerInput?.question === "" || queAnswerInput?.answer === "") {
            return;
        }
        if (faqs.length >= 10) {
            alert('maximum question answer should be 10');
            return;
        }

        setFaqs(prev => [
            ...prev,
            {
                question: queAnswerInput?.question,
                answer: queAnswerInput?.answer,
                open: queAnswerInput?.open,
            }
        ]);
        setQueAnswerInput({ question: '', answer: '', open: false });
        setAddQueAnswer(true);
    }

    useEffect(() => {
        setItems(faqs);
    }, [faqs]);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div>
                <h2 className="text-xl font-semibold mb-4">Good to know</h2>
                <div className="text-sm mb-4">Use this section to feature specific information about your event. Add highlights and frequently asked questions for attendees.</div>
                <h2 className="text-lg font-semibold mb-4">Frequently asked questions</h2>
                <div className="text-sm mb-4">Answer questions your attendees may have about the event, like accessibility and amenities.</div>
            </div>

            <div className="w-full max-w-xl space-y-4">
                {items.map((faq, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow">
                        <div
                            className="flex items-start justify-between cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(index);
                                    }}
                                >
                                    <Edit size={14} className='cursor-pointer'/>
                                </button>
                                <FaAngleDown />
                            </div>
                        </div>
                        {faq.open && (
                            <div className="mt-2 p-3 bg-gray-50 text-sm text-gray-700 rounded-md">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {addQueAnswer && (
                <div className="w-full space-y-6 mt-10">
                    <input
                        type="text"
                        value={queAnswerInput?.question}
                        onChange={(e) =>
                            setQueAnswerInput(prev => ({ ...prev, question: e.target.value }))
                        }
                        className="peer w-full border border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="Question *"
                    />
                    <textarea
                        value={queAnswerInput?.answer}
                        onChange={(e) =>
                            setQueAnswerInput(prev => ({ ...prev, answer: e.target.value }))
                        }
                        rows="4"
                        className="peer w-full border border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="Answer *"
                    />
                </div>
            )}

            <div
                onClick={handleQueAnswer}
                className='text-xs text-blue-500 hover:bg-gray-100 cursor-pointer w-fit px-2 py-1 rounded cursor-pointer'>
                + Add Question
            </div>

            {/* Edit Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Question & Answer</h3>
                        <input
                            type="text"
                            value={editData.question}
                            onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                            className="w-full border border-gray-400 rounded-md px-3 py-2 mb-4 focus:border-blue-500 focus:outline-none"
                            placeholder="Question"
                        />
                        <textarea
                            value={editData.answer}
                            onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                            rows="4"
                            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                            placeholder="Answer"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Faq;

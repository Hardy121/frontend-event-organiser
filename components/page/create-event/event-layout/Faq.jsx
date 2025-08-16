import { ArrowDownFromLine, Edit, } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Faq = ({ faqs, setFaqs }) => {
    const [queAnswerInput, setQueAnswerInput] = useState({
        question: '',
        answer: '',
        open: false
    })
    const [addQueAnswer, setAddQueAnswer] = useState(true);
    const [items, setItems] = useState(faqs);

    const toggleAnswer = (index) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, open: !item.open } : item
            )
        );
    };


    const editAnswer = (index) => {
        const newAnswer = prompt("Edit answer:", items[index].answer);
        if (newAnswer != null) {
            setItems((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, answer: newAnswer } : item
                )
            );
        }
    };


    function handleQueAnswer() {
        if (queAnswerInput?.question == "" || queAnswerInput?.answer == "") {
            return;
        }
        if (faqs.length > 10) {
            alert('maximum question answer should be 10');
            return;
        }


        if (!addQueAnswer) {
            setAddQueAnswer(true);
            return;
        }
        setFaqs(prev => [
            ...prev,
            {
                question: queAnswerInput?.question,
                answer: queAnswerInput?.answer,
                open: queAnswerInput?.open,
            }
        ]
        );
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
            <div>

                <div className="w-full max-w-xl space-y-4">
                    {items.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-md shadow"
                        >
                            {/* Question */}
                            <div
                                className="flex items-start justify-between cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                            >
                                <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editAnswer(index);
                                        }}
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <ArrowDownFromLine />
                                </div>
                            </div>

                            {/* Answer */}
                            {faq.open && (
                                <div className="mt-2 p-3 bg-gray-50 text-sm text-gray-700 rounded-md">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {addQueAnswer &&
                    <div className="w-full space-y-6">
                        {/* Question Field */}
                        <div className="relative">
                            <input
                                type="text"
                                value={queAnswerInput?.question}
                                onChange={(e) =>
                                    setQueAnswerInput(prev => ({ ...prev, question: e.target.value }))
                                }
                                className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:border-blue-500 focus:outline-none"
                                placeholder=" "
                            />
                            <label
                                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-blue-500 peer-focus:text-sm"
                            >
                                Question *
                            </label>
                        </div>

                        {/* Answer Field */}
                        <div className="relative">
                            <textarea
                                value={queAnswerInput?.answer}
                                onChange={(e) =>
                                    setQueAnswerInput(prev => ({ ...prev, answer: e.target.value }))
                                }
                                rows="4"
                                className="peer w-full border border-gray-400 rounded-md px-3 pt-5 pb-2 focus:border-blue-500 focus:outline-none"
                                placeholder=" "
                            />
                            <label
                                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-blue-500 peer-focus:text-sm"
                            >
                                Answer *
                            </label>
                        </div>
                    </div>}

                <div
                    onClick={handleQueAnswer}
                    className='text-xs text-blue-500 hover:bg-gray-100 cursor-pointer w-fit px-2 py-1 rounded'>+ Add Question</div>
            </div>


        </div>


    )
}

export default Faq
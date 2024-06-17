'use client'
import getChatGPTAssistantList from '@/_actions/getChatGPTAssistantList'
import updateInstruction from '@/_actions/updateAssistantInstructionAction'
import { useEffect, useState } from 'react'

export default function ChatGPTPage() {
  const [instruction, setInstruction] = useState('')
  const [temp, setTemp] = useState(1)
  const [top, setTop] = useState(0.5)

  const [loading, setLoading] = useState(false)

  const [assistants, setAssistants] = useState([])

  const [selectedAssistant, setSelected] = useState()

  const updateSelected = (id) => {
    let selected = assistants.find((obj) => obj.id === id)
    setSelected(selected)
    setInstruction(selected.instructions)
    setTemp(selected.temperature)
    setTop(selected.top_p)
  }

  useEffect(() => {
    const getAssistants = async () => {
      const data = await getChatGPTAssistantList()
      setAssistants(data)
    }
    getAssistants()
  }, [])

  const sendMessage = async () => {
    setLoading(true)
    try {
      const response = await updateInstruction(
        selectedAssistant.id,
        instruction,
        top,
        temp
      )
      alert('Update Success')
    } catch (e) {
      console.log(e)
      return { errorMsg: e.message }
    }
    setLoading(false)
  }

  return (
    <section className="bg-gray-900 pt-4 h-full p-7">
      <div className="container-fluid h-full">
        <div className="w-full h-full rounded shadow-lg bg-clip-border bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Train ChatGPT Assistant with the instruction
            </h1>
            <div className="form">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="assistant"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Assistant
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={(e) => {
                      updateSelected(e.target.value)
                    }}
                    defaultValue="default"
                  >
                    <option disabled value="default">
                      Select Assistant
                    </option>
                    {assistants?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {`${data.name} (${data.id})`}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAssistant && (
                  <>
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Assistant Name(optional)
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled"
                        disabled
                        value={selectedAssistant?.name}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="model"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        id="model"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled"
                        disabled
                        value={selectedAssistant?.model}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="temperature"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tempreature {temp}
                      </label>
                      <input
                        id="minmax-range"
                        type="range"
                        min="0.01"
                        max="2"
                        step={0.01}
                        value={temp}
                        onChange={(e) => setTemp(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="top"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Top {top}
                      </label>
                      <input
                        id="top"
                        type="range"
                        min="0.01"
                        step={0.01}
                        max="1"
                        value={top}
                        onChange={(e) => setTop(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Instruction
                      </label>
                      <textarea
                        className=" resize-none bg-gray-50 border h-64 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        onClick={() => {
                          instruction && sendMessage()
                        }}
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        {loading ? 'loading...' : 'Save Assistant'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// src/components/Category.jsx
import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import './Category.css';
import { Droppable } from 'react-beautiful-dnd';

const Category = ({ title, widgets, categoryId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <section className="category">
            <h2 className="category-title">{title}</h2>

            <Droppable droppableId={categoryId} type="WIDGET">
                {(provided) => (
                    <div
                        className="widget-grid"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {/* --- THIS IS THE FIX --- */}
                        {widgets.map((widget, index) => (
                            <Widget
                                key={widget.id}
                                index={index}
                                title={widget.title}
                                content={widget.content}
                                type={widget.type}
                                data={widget.data}
                                categoryId={categoryId}
                                widgetId={widget.id} // Explicitly passing widget.id as the widgetId prop
                            />
                        ))}
                        {/* --- END OF FIX --- */}

                        {provided.placeholder}
                        <div className="add-widget-placeholder" onClick={handleOpenModal}>
                            <span>+ Add Widget</span>
                        </div>
                    </div>
                )}
            </Droppable>

            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                categoryId={categoryId}
            />
        </section>
    );
};

export default Category;
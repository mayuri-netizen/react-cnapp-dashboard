

import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import './Category.css';

const Category = ({ title, widgets, categoryId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <section className="category">
            <h2 className="category-title">{title}</h2>
            <div className="widget-grid">

                {widgets.map((widget) => (
                    <Widget
                        key={widget.id}
                        categoryId={categoryId}
                        widgetId={widget.id}

                        {...widget}
                    />
                ))}


                <div className="add-widget-placeholder" onClick={handleOpenModal}>
                    <span>+ Add Widget</span>
                </div>
            </div>

            <AddWidgetModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                categoryId={categoryId}
            />
        </section>
    );
};

export default Category;
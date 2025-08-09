
import React, { useState, useMemo, useEffect } from 'react';
import './AddWidgetModal.css';
import { useDashboard } from '../context/DashboardContext';
import { allWidgets } from '../data/allWidgets';

const AddWidgetModal = ({ isOpen, onClose, categoryId }) => {
    const { categories, addWidget } = useDashboard();
    const [selectedWidgetIds, setSelectedWidgetIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isOpen) {
            // --- LOGGING FOR MODAL RESET ---
            console.log('%c[MODAL] Modal is OPENING. Resetting internal state.', 'color: blue; font-weight: bold;');
            setSelectedWidgetIds([]);
            setSearchTerm('');
        }
    }, [isOpen]);

    const availableWidgets = useMemo(() => {
        if (!isOpen) return [];
        const currentCategory = categories.find((c) => c.id === categoryId);
        const existingWidgetIds = currentCategory.widgets.map((w) => w.id);
        return allWidgets[categoryId]?.filter((w) => !existingWidgetIds.includes(w.id)) || [];
    }, [isOpen, categories, categoryId]);

    const filteredWidgets = availableWidgets.filter((widget) =>
        widget.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectWidget = (widgetId) => {
        setSelectedWidgetIds((prev) =>
            prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]
        );
    };

    const handleConfirm = () => {
        const widgetsToAdd = availableWidgets.filter((w) => selectedWidgetIds.includes(w.id));

        // --- LOGGING FOR CONFIRM ---
        console.log('[MODAL] Confirm clicked. Widgets selected in modal state:', selectedWidgetIds);
        console.log('[MODAL] Passing these full widget objects to context:', widgetsToAdd);

        if (widgetsToAdd.length > 0) {
            addWidget(categoryId, widgetsToAdd);
        }
        onClose();
    };

    if (!isOpen) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add a Widget</h2>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        placeholder="Search widgets..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="widget-list">
                        {filteredWidgets.length > 0 ? (
                            filteredWidgets.map((widget) => (
                                <div
                                    key={widget.id}
                                    className={`widget-list-item ${selectedWidgetIds.includes(widget.id) ? 'selected' : ''}`}
                                    onClick={() => handleSelectWidget(widget.id)}
                                >
                                    <span className="widget-item-title">{widget.title}</span>
                                    <span className="widget-item-checkbox">{selectedWidgetIds.includes(widget.id) ? '✓' : ''}</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-widgets-message">No matching widgets found.</p>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="button-secondary" onClick={onClose}>Cancel</button>
                    <button className="button-primary" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default AddWidgetModal;
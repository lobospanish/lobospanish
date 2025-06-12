{handleProductClick}
                />
              </>
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {filters.category || 'All Products'}
                    </h1>
                    <p className="text-gray-600">
                      {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>

                    {/* Filter Toggle */}
                    <button
                      onClick={() => setIsFilterSidebarOpen(true)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Filters</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-8">
                  <div className="hidden lg:block">
                    <FilterSidebar
                      isOpen={true}
                      onClose={() => {}}
                      filters={filters}
                      onFilterChange={setFilters}
                    />
                  </div>

                  <div className="flex-1">
                    <ProductGrid
                      products={filteredProducts}
                      onProductClick={handleProductClick}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>

          <Footer />

          {/* Modals and Sidebars */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFilterChange={setFilters}
          />

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
